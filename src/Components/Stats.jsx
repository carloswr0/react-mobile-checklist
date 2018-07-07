// Packages
import React from 'react';

const Stats = (props) => {
  let widthStyle = { width: `${props.percent}%`, transition: '0.1s' };
  return (
    <div className="row StatsDiv animated fadeInDown" style={{marginRight: '0px',marginLeft: '0px'}}>
      <div className="loadingBar" style={widthStyle} >
        <p className="ItemsPercent">
          
          { props.percent !== 0 ?
          <span id="statsNumbers" style={{marginBottom:'0px'}}>{props.percent}% </span> : null 
          }

        </p>
      </div>
    </div>
  );
};

export default Stats;