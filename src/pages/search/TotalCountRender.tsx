const TotalCountRender = ({
  q,
  totalCount,
}: {
  q: string;
  totalCount: number;
}) => {
  return q ? (
    <span>
      &ldquo;{q}&ldquo;님을 총 &nbsp;
      <span className="text-green-200">{totalCount}</span>명 찾았습니다.
    </span>
  ) : (
    <span>
      총 <span className="text-green-200">{totalCount}</span>명입니다.
    </span>
  );
};

export default TotalCountRender;
