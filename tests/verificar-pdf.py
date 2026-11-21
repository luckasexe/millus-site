import sys
import pymupdf

with pymupdf.open(sys.argv[1]) as pdf:
    assert len(pdf) >= 3, len(pdf)
    texto = "\n".join(pagina.get_text() for pagina in pdf)
    for termo in (
        "MILLUS-FIXTURE", "Águia Manutenção", "Márcia", "contato@millus.com.br",
        "Mangueira", "Pressão oscilante", "MARCADOR FINAL LONGO", "Histórico informado",
        "Inspeção visual", "Não sabe", "Queda observada.", "Oxidação aparente.",
        "cliente-ação.png", "inspeção-visível.png", "Assinatura manual", "autorização de reparo",
    ):
        assert termo in texto, termo
    corpo = " ".join(" ".join(pagina.get_text().splitlines()[4:-2]) for pagina in pdf)
    assert corpo.count("Pressão oscilante e ruído durante a operação.") == 240
    assert "RESIDUAL OCULTO" not in texto and "Pressão no reservatório" not in texto
    fotos = 0
    for indice, pagina in enumerate(pdf):
        assert abs(pagina.rect.width - 595.28) < 0.5
        assert abs(pagina.rect.height - 841.89) < 0.5
        assert f"{indice + 1} / {len(pdf)}" in pagina.get_text()
        for imagem in pagina.get_image_info():
            if imagem["width"] == 170:
                x0, y0, x1, y1 = imagem["bbox"]
                assert abs((x1 - x0) / (y1 - y0) - 1.7) < 0.02
                fotos += 1
        linhas = sorted(
            (linha["bbox"] for bloco in pagina.get_text("dict")["blocks"]
             if bloco["type"] == 0 for linha in bloco["lines"]),
            key=lambda caixa: caixa[1],
        )
        for x0, y0, x1, y1 in linhas:
            assert 0 < x0 < x1 < pagina.rect.width
            assert 0 < y0 < y1 < pagina.rect.height
        for anterior, atual in zip(linhas, linhas[1:]):
            sobreposicao_x = min(anterior[2], atual[2]) - max(anterior[0], atual[0])
            if sobreposicao_x > 2:
                assert anterior[3] <= atual[1] + 1, (indice, anterior, atual)
    assert fotos == 2, fotos
    pdf[0].get_pixmap().save(sys.argv[1].replace(".pdf", "-pagina1.png"))
    print(f"PDF A4 verificado: {len(pdf)} páginas, {fotos} fotos e textos completos.")
