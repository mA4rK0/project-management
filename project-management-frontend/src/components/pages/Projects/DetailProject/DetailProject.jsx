import DetailProjectContainer from './components/DetailProjectContainer';
import DetailProjectProvider from './DetailProjectContext';

const DetailProject = () => {
  return (
    <DetailProjectProvider>
      <DetailProjectContainer />
    </DetailProjectProvider>
  );
};

export default DetailProject;
