
export const setupScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  const elements = document.querySelectorAll('.scroll-animation');
  elements.forEach((element) => observer.observe(element));

  return () => {
    elements.forEach((element) => observer.unobserve(element));
  };
};
