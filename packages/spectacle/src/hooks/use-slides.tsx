import { useState, useEffect, useId } from 'react';
import { SlideId } from '../components/deck/deck';

export const PLACEHOLDER_CLASS_NAME = 'spectacle-v7-slide';

// After the initial render pass, this hook actually goes and looks for
// <Slide> elements rendered lower in the tree. Slides decide on an ID for
// themselves and communicate via the `data-slide-key` element on their
// placeholder.
export function useCollectSlides() {
  const [initialized, setInitialized] = useState(false);
  const [slideContainer, setSlideContainer] = useState<HTMLElement | null>();
  const [slideIds, setSlideIds] = useState<SlideId[]>([]);
  const [slideIdsOfSlidesWithTemplates, setSlideIdsOfSlidesWithTemplates] =
    useState<Set<SlideId>>(new Set());

  useEffect(() => {
    if (!slideContainer) return;
    const slides = slideContainer.getElementsByClassName(
      PLACEHOLDER_CLASS_NAME
    ) as unknown as Iterable<HTMLElement>;

    const nextSlideIds: SlideId[] = [];
    const nextSlideIdsOfSlidesWithTemplates: Set<SlideId> = new Set();
    for (const placeholderNode of slides) {
      const { slideId, slideHasTemplate } = placeholderNode.dataset;
      if (slideId !== undefined) {
        nextSlideIds.push(slideId);
        if (slideHasTemplate === 'true') {
          nextSlideIdsOfSlidesWithTemplates.add(slideId);
        }
      }
    }
    setSlideIds(nextSlideIds);
    setSlideIdsOfSlidesWithTemplates(nextSlideIdsOfSlidesWithTemplates);
    setInitialized(true);
  }, [slideContainer]);

  return [
    setSlideContainer,
    slideIds,
    slideIdsOfSlidesWithTemplates,
    initialized
  ] as const;
}

export function useSlide(
  doesSlideHaveTemplate: boolean,
  userProvidedId?: SlideId
) {
  const id = useId();
  const [slideId] = useState<SlideId>(userProvidedId || id);
  return {
    slideId,
    placeholder: (
      <div
        className={PLACEHOLDER_CLASS_NAME}
        data-slide-id={slideId}
        data-slide-has-template={doesSlideHaveTemplate}
      />
    )
  };
}
