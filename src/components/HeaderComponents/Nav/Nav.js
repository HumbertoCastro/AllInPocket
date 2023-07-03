import React, { useContext } from 'react';
import svgs from '../../../helpers/svg';
import ButtonIcon from '../../Inputs/Button-icon/Button-icon';
import pocketContext from '../../../context/pocketContext';
import Daily from '../../WeeklyPlanerComponents/Daily/Daily';
import TaskList from '../../TaskListComponents/TaskList/TaskList';
import Finance from '../../FinanceComponents/Finance/Finance';
import Weather from '../../WeatherComponents/Weather/Weather';

const Nav = () => {
  const {
    setPage,
    theme,
  } = useContext(pocketContext);

  const onClick = (pageName) => {
    setPage(pageName)
  }

  return(
  <div className="row s-btw nav" style={ { backgroundColor: theme.backgroundColor  } }>
    {
    // <ButtonIcon iconSvg={ svgs.calendar } callback={ () => {onClick(<Calendar />)} } id="1" name="Calendar" />
    }
    <ButtonIcon iconSvg={ svgs.day } callback={ () => {onClick(<Daily />)} } id="2" />
    <ButtonIcon iconSvg={ svgs.note } callback={ () => {onClick(<TaskList />)} } id="3"  />
    <ButtonIcon iconSvg={ svgs.money } callback={ () => {onClick(<Finance />)} } id="4"  />
    <ButtonIcon iconSvg={ svgs.clouds } callback={ () => {onClick(<Weather />)} } id="5"  />
  </div>)
};

Nav.propTypes = {};

Nav.defaultProps = {};

export default Nav;
