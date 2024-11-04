const ReactModule = () => {
  return (
    // <div className="flex items-center justify-center gap-[15px]">
    <div className="customToolBar">
      <button type="button" className="ql-bold" />
      <button type="button" className="ql-italic" />
      <button type="button" className="ql-underline" />
      <button type="button" className="ql-blockquote" />
      <button type="button" className="ql-code-block" />

      <span className="ql-separator" />

      <span className="ql-formats">
        <select className="ql-header" defaultValue="7">
          <option value="1">제목</option>
          <option value="2">소제목</option>
          <option value="7">본문</option>
        </select>
      </span>
      <button type="button" className="ql-list" value="ordered" />
      <button type="button" className="ql-list" value="bullet" />

      <span className="ql-separator" />

      <button type="button" className="ql-align" value="" />
      <button type="button" className="ql-align" value="center" />
      <button type="button" className="ql-align" value="right" />

      <span className="ql-separator" />

      <select className="ql-color" />
      <select className="ql-background" />

      <span className="ql-separator" />

      <button type="button" className="ql-image" />
      <button type="button" className="ql-video" />
      <button type="button" className="ql-link" />
    </div>
  );
};

export default ReactModule;
