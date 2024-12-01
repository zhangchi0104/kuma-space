/** @format */
import { faRoadBarrier } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const UnderConstruction = () => {
  return (
    <div className='text-center text-muted-foreground border border-dashed rounded-lg p-6'>
      <FontAwesomeIcon icon={faRoadBarrier} size='10x' />
      <p className='mt-4 md:mt-6 text-lg'>This section is under construction</p>
    </div>
  );
};

export default UnderConstruction;
