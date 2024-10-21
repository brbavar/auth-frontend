const EyeIconBox = (props) => {
  return (
    <div className='eye-icon-box'>
      <svg
        className='eye-icon'
        onClick={props.eyeClickHandler}
        width='113'
        height='66'
        viewBox='0 0 113 66'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d={props.svgPath} stroke='rgba(0, 0, 0, .6)' strokeWidth='5' />
        <circle cx={props.svgCX} cy='33.5' r='18.5' fill='rgba(0, 0, 0, .6)' />
        <line
          x1='1.07793'
          y1='3.74433'
          x2='114.078'
          y2='57.7443'
          stroke='rgba(0, 0, 0, .6)'
          strokeWidth={props.lineWidth}
        />
      </svg>
    </div>
  );
};

export default EyeIconBox;
