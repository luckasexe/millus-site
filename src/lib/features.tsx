export const featuresResponse = [
  {
    id: 1,
    icon: () => (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "proposta 1",
    description: "Descrição da primeira feature.",
    image: "https://placehold.co/600x400",
  },
  {
    id: 2,
    icon: () => (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Feature 2",
    description: "Descrição da segunda feature.",
    image: "https://placehold.co/600x400",
  },
  {
    id: 3,
    icon: () => (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Feature 3",
    description: "Descrição da terceira feature.",
    image: "https://placehold.co/600x400",
  },
];