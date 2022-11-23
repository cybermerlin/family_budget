let scrollbarWidth = (): number => {
  let scrollDiv = document.createElement('div');

  scrollDiv.setAttribute(
      'style',
      'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;'
  );
  document.body.appendChild(scrollDiv);

  let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  document.body.removeChild(scrollDiv);

  return scrollbarWidth;
};

export default scrollbarWidth;
