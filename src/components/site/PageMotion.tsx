"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content is visible before JS, and remains visible if animation fails. */
export default function PageMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const page = document.querySelector<HTMLElement>(".om-page");
    if (!page || preference.matches || typeof Element.prototype.animate !== "function") return;
    const animations = new Set<Animation>();
    const run = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
      const animation = element.animate(frames, options);
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    page.querySelectorAll("[data-motion='hero-line']").forEach((line, index) => {
      run(line, [{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 650, delay: index * 110, easing: "cubic-bezier(.2,.65,.25,1)", fill: "backwards" });
    });
    page.querySelectorAll("[data-motion='hero-photo'] img").forEach(photo => {
      run(photo, [{ opacity: .72, transform: "scale(1.035)" }, { opacity: 1, transform: "scale(1)" }], { duration: 1500, easing: "cubic-bezier(.2,.65,.25,1)" });
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        run(entry.target, [{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 540, easing: "cubic-bezier(.2,.65,.25,1)" });
      });
    }, { threshold: .12, rootMargin: "0px 0px -30px 0px" });
    page.querySelectorAll(".om-heading, .om-concern-card, .om-physical-feature, .om-specialty, .om-field-grid > article, .om-requirements > article, .om-explainer, .om-support-points article, .om-detail-points article, .om-process-list li, .om-end-inner").forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight - 30) observer.observe(element);
    });
    const stop = () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); animations.clear(); };
    preference.addEventListener("change", stop);
    return () => { stop(); preference.removeEventListener("change", stop); };
  }, [pathname]);
  return null;
}
