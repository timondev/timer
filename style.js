function isColor(color) {
  const styleOption = new Option().style;
  styleOption.color = color;
  return styleOption.clor !== '';
}

function isSize(size) {
  return size.match(/^[0-9]+(?:cm|mm|in|px|pt|pc|em|ex|ch|rem|vw|vh|vmin|vmax|%)$/) !== null;
}

function isFontFamily(fontFamily) {
  return fonts[fontFamily] !== undefined;
}

function toFontVariant(variant, italic = false) {
  return (variant == 400 ? 'regular' : variant) + (italic ? 'italic' : '');
}

function isFontVariant(fontFamily, fontVariant) {
  return fonts[fontFamily].variants.includes(toFontVariant(fontVariant));
}

function dynamicResize() {
  const compressor = bodyRef.getBoundingClientRect();
  const boundingSize = (compressor.width < compressor.height) ? compressor.height : compressor.width;
  let fontSize = boundingSize;

  timerRef.style.fontSize = fontSize + 'px';
  let boundingBox = timerRef.getBoundingClientRect();

  while(boundingBox.width > compressor.width || boundingBox.height > compressor.height) {
    fontSize -= 1;
    boundingBox = timerRef.getBoundingClientRect();

    timerRef.style.fontSize = fontSize + 'px';
  }
}

function changeFontFamily(fontFamily) {
  if(isFontFamily(fontFamily)) {
    timerRef.style.fontFamily = fontFamily;

    const fontLoader = document.createElement('link');
    fontLoader.rel = 'stylesheet';
  
    if (params.has('font-weight')) {
      const fontVariant = params.get('font-weight');

      if(isFontVariant(fontFamily, fontVariant)) {
        fontLoader.href = 'https://fonts.googleapis.com/css2?family=' + fontFamily + ':wght@' + params.get('font-weight') + '&display=swap';
    
        timerRef.style.fontWeight = params.get('font-weight');
      }
    } else {
      fontLoader.href = 'https://fonts.googleapis.com/css2?family=' + fontFamily + '&display=swap';
    }
  
    headRef.appendChild(fontLoader);
  }
}

if (params.has('background-color')) {
  const backgroundColor = params.get('background-color');

  if (isColor(backgroundColor)) {
    bodyRef.style.backgroundColor = params.get('background-color');
  }
}

if (params.has('color')) {
  const foregroundColor = params.get('color');

  if (isColor(foregroundColor)) {
    timerRef.style.color = params.get('color');
  }
}

if (params.has('font-size')) {
  timerRef.style.fontSize = params.get('font-size');
} else if (params.has('dynamic-font')) {
  bodyRef.style.overflow = 'hidden';
  timerRef.style.lineHeight = 1;

  const observer = new MutationObserver(dynamicResize);
  observer.observe(timerRef, { childList: true });

  window.addEventListener('resize', dynamicResize);
  dynamicResize();
}

if (params.has('font-family')) {
  const fontFamily = params
    .get('font-family')
    .replace(
      /\w\S*/g,
      function (word) {
        return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
      }
    );

  changeFontFamily(fontFamily);
}

if (params.has('letter-spacing')) {
  const letterSpacing = params.get('letter-spacing');

  if (isSize(letterSpacing)) {
    timerRef.style.letterSpacing = params.get('letter-spacing');
  }
}