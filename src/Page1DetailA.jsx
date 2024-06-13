import { useLocation, useHistory } from "react-router-dom";

export const Page1DetailA = () => {
  const { state } = useLocation();
  console.log(state);

  // const history = useHistory();

  const onClickInfo = () => {
    console.log('Info button clicked');
    window.CommandBar.trackEvent('startTourDetailA', {});
    console.log('Event tracked: startTourDetailA');
  };

  return (
    <div>
      <h1>Page1DetailAページです</h1>
      <button onClick={onClickInfo}>Info</button>
    </div>
  );
};