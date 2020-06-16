 import React from 'react';


//use double curly bracket for including sytles. props.childern alllows you to create components that wrap around//

const Scroll = (props) => {
    return (
     <div style={{ overflowY: 'scroll', border: '5px solid black', height: '800px'}}>
        {props.children}
     </div>
    );
};
  export default Scroll;