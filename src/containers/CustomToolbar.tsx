const CustomToolbar = () => (
  <div id="toolbar">
    <button type="button" className="ql-bold" aria-label="Bold"></button>
    <button type="button" className="ql-italic" aria-label="Italic"></button>
    <button
      type="button"
      className="ql-underline"
      aria-label="Underline"
    ></button>
    <button
      type="button"
      className="ql-align"
      value=""
      aria-label="Align Left"
    ></button>
    <button
      type="button"
      className="ql-align"
      value="center"
      aria-label="Align Center"
    ></button>
    <button
      type="button"
      className="ql-align"
      value="right"
      aria-label="Align Right"
    ></button>
    <button type="button" className="ql-color" aria-label="color"></button>
    <button
      type="button"
      className="ql-background"
      aria-label="background"
    ></button>
    <button type="button" className="ql-image" aria-label="image"></button>
  </div>
);

export default CustomToolbar;