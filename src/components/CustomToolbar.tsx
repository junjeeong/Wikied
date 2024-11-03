const CustomToolbar = () => (
  <div id="toolbar">
    <div className="flex justify-between">
      <div className="flex gap-4">
        <div className="flex gap-1">
          <button
            type="button"
            className="ql-bold"
            aria-label="Italiciz"
          ></button>
          <button
            type="button"
            className="ql-italic"
            aria-label="Italicize Text"
          ></button>
          <button
            type="button"
            className="ql-underline"
            aria-label="Underline Text"
          ></button>
        </div>

        <div className="flex gap-1">
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
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            className="ql-list"
            value="ordered"
            aria-label="Ordered List"
          ></button>
          <button
            type="button"
            className="ql-list"
            value="bullet"
            aria-label="Bullet List"
          ></button>
          <select className="ql-color" aria-label="Text Color">
            <option value="#000000" label="Black"></option>
            <option value="#e60000" label="Red"></option>
            <option value="#ff9900" label="Orange"></option>
            <option value="#ffff00" label="Yellow"></option>
            <option value="#008a00" label="Green"></option>
            <option value="#0066cc" label="Blue"></option>
            <option value="#9933ff" label="Purple"></option>
            <option value="#ffffff" label="White"></option>
            <option value="#facccc" label="Light Red"></option>
            <option value="#ffebcc" label="Light Orange"></option>
            <option value="#ffffcc" label="Light Yellow"></option>
            <option value="#cce8cc" label="Light Green"></option>
            <option value="#cce0f5" label="Light Blue"></option>
            <option value="#ebd6ff" label="Light Purple"></option>
            <option value="#bbbbbb" label="Gray"></option>
            <option value="#f06666" label="Medium Red"></option>
            <option value="#ffc266" label="Medium Orange"></option>
            <option value="#ffff66" label="Medium Yellow"></option>
            <option value="#66b966" label="Medium Green"></option>
            <option value="#66a3e0" label="Medium Blue"></option>
            <option value="#c285ff" label="Medium Purple"></option>
            <option value="#888888" label="Dark Gray"></option>
            <option value="#a10000" label="Dark Red"></option>
            <option value="#b26b00" label="Dark Orange"></option>
            <option value="#b2b200" label="Dark Yellow"></option>
            <option value="#006100" label="Dark Green"></option>
            <option value="#0047b2" label="Dark Blue"></option>
            <option value="#6b24b2" label="Dark Purple"></option>
          </select>
          <select className="ql-background" aria-label="Background Color">
            <option value="#000000" label="Black"></option>
            <option value="#e60000" label="Red"></option>
            <option value="#ff9900" label="Orange"></option>
            <option value="#ffff00" label="Yellow"></option>
            <option value="#008a00" label="Green"></option>
            <option value="#0066cc" label="Blue"></option>
            <option value="#9933ff" label="Purple"></option>
            <option value="#ffffff" label="White"></option>
            <option value="#facccc" label="Light Red"></option>
            <option value="#ffebcc" label="Light Orange"></option>
            <option value="#ffffcc" label="Light Yellow"></option>
            <option value="#cce8cc" label="Light Green"></option>
            <option value="#cce0f5" label="Light Blue"></option>
            <option value="#ebd6ff" label="Light Purple"></option>
            <option value="#bbbbbb" label="Gray"></option>
            <option value="#f06666" label="Medium Red"></option>
            <option value="#ffc266" label="Medium Orange"></option>
            <option value="#ffff66" label="Medium Yellow"></option>
            <option value="#66b966" label="Medium Green"></option>
            <option value="#66a3e0" label="Medium Blue"></option>
            <option value="#c285ff" label="Medium Purple"></option>
            <option value="#888888" label="Dark Gray"></option>
            <option value="#a10000" label="Dark Red"></option>
            <option value="#b26b00" label="Dark Orange"></option>
            <option value="#b2b200" label="Dark Yellow"></option>
            <option value="#006100" label="Dark Green"></option>
            <option value="#0047b2" label="Dark Blue"></option>
            <option value="#6b24b2" label="Dark Purple"></option>
          </select>
          <button
            type="button"
            className="ql-image"
            aria-label="Insert Image"
          ></button>
        </div>
      </div>
      <button type="button" className="ql-link" aria-label="Insert Link" />
    </div>
  </div>
);

export default CustomToolbar;
