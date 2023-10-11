import { makeCall } from '/imports/ui/services/api';
import { throttle } from '/imports/utils/throttle';

const PAN_ZOOM_INTERVAL = Meteor.settings.public.presentation.panZoomInterval || 200;

const previousSlide = (currentSlideNum, podId) => {
  if (currentSlideNum > 1) {
    makeCall('switchSlide', currentSlideNum - 1, podId);
  }
};

const nextSlide = (currentSlideNum, numberOfSlides, podId) => {
  if (currentSlideNum < numberOfSlides) {
    makeCall('switchSlide', currentSlideNum + 1, podId);
  }
};

const zoomSlide = throttle((currentSlideNum, podId, widthRatio, heightRatio, xOffset, yOffset) => {
  makeCall('zoomSlide', currentSlideNum, podId, widthRatio, heightRatio, xOffset, yOffset);
}, PAN_ZOOM_INTERVAL);

const skipToSlide = (requestedSlideNum, podId) => {
  makeCall('switchSlide', requestedSlideNum, podId);
};

export default {
  nextSlide,
  previousSlide,
  skipToSlide,
  zoomSlide,
};
