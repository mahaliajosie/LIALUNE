// ----------------------------- 
// ----------- Icons -----------
// import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as faHeartSolid, faCirclePlus, faCircleXmark, faPaintbrush } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

// List of used icons here
// library.add(
//   faHeartSolid,
//   faHeartRegular,
//   faCirclePlus,
//   faCircleXmark,
//   faPaintbrush
// );

export const Icons = {
    heartSolid: faHeartSolid, 
    heartEmpty: faHeartRegular, 
    addCircle: faCirclePlus, 
    close: faCircleXmark,
    edit: faPaintbrush,
};