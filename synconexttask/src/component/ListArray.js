// import { Button } from '@material-ui/core';
// import React, { Component } from 'react';

import { Button } from "@material-ui/core"
import ReactDropdown from "react-dropdown";


// class ListArray extends Component {
//   constructor(props) {
//     super(props);
//   }



//   render () {
//     let countriesList = this.props.data.length > 0
//     	&& this.props.data.map((item, i) => {
//             console.log(item)
//       return (
//         <option key={i} value={item.id}>{item.endDate}</option>
//       )
//     }, this);

//     return (
//       <span>
//         <select>
//           <Button onClick={() => {this.props.sendDataToParent(countriesList)} }>{countriesList}</Button>
//         </select>
//       </span>
//     );
//   }
// }

// export default ListArray

const ListArray = ({data, sendDataToParent} ) => {

    return (
        
        <option onClick={() => {
            sendDataToParent(data);
          }}>{data.start}</option>
         
    )

}
export default ListArray
