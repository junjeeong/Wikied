const ReactModule = () => {
  return (
    // <div className="flex items-center justify-center gap-[15px]">
    <div className="wikiToolBar ">
      <span className="ql-formats">
        <button type="button" className="ql-bold" />
        <button type="button" className="ql-italic" />
        <button type="button" className="ql-underline" />
        <button type="button" className="ql-blockquote" />
        <button type="button" className="ql-code-block" />
      </span>

      <span className="ql-formats">
        <select className="ql-header" defaultValue="7">
          <option value="1">제목</option>
          <option value="2">소제목</option>
          <option value="7">본문</option>
        </select>
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-list" value="ordered" />
        <button type="button" className="ql-list" value="bullet" />
      </span>

      <span className="ql-formats">
        <button type="button" className="ql-align" value="" />
        <button type="button" className="ql-align" value="center" />
        <button type="button" className="ql-align" value="right" />
      </span>

      <span className="ql-formats">
        <select className="ql-color" />
        <select className="ql-background" />
      </span>

      <span className="ql-formats">
        <button type="button" className="ql-image" />
        <button type="button" className="ql-link" />
      </span>
    </div>
  );
};

export default ReactModule;
