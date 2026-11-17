// Run in the browser console at /produtos/hl-multi-1000.
// Does not open WhatsApp or send messages. Returns a Promise of assertions.
(async () => {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const nextFrame = () => new Promise(resolve => requestAnimationFrame(resolve));
  assert(document.querySelector('h1')?.textContent.includes('HL MULTI'), 'Product route renders');
  for (const volume of ['2 L', '5 L', '2 L']) {
    const input = document.querySelector(`input[value="${volume}"]`);
    assert(input, `Volume ${volume} exists`);
    input.click();
    await nextFrame();
    assert(input.checked, `Selected ${volume}`);
    assert(document.querySelector('.hl-summary').textContent.includes(`· ${volume}`), `Summary matches ${volume}`);
    const href = new URL(document.querySelector('.hl-button').href);
    assert(href.searchParams.get('phone') === '5513982071346', 'Existing Millus destination');
    assert(href.searchParams.get('text').includes(`HL Multi 1000 Henlau, embalagem de ${volume}.`), `CTA matches ${volume}`);
  }
  assert([...document.querySelectorAll('.hl-page img')].every(image => image.complete && image.naturalWidth > 0), 'Product image decoded');
  assert(document.documentElement.scrollWidth <= innerWidth, 'No horizontal overflow');
  return 'PASS: product route, 2/5/2 L selection, summary, CTA destination/message, image and overflow';
})();
