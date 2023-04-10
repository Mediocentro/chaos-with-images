import DOMPurify from "dompurify";

interface Props {
  htmlContent: string;
}

const DomPurifiedUtil = ({ htmlContent }: Props) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default DomPurifiedUtil;
