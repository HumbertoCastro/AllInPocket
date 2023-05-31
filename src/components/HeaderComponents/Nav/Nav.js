import React, { useContext } from 'react';
import svgs from '../../../helpers/svg';
import ButtonIcon from '../../Inputs/Button-icon/Button-icon';
import pocketContext from '../../../context/pocketContext';
import Calendar from '../../Calendar/Calendar';
import Daily from '../../WeeklyPlanerComponents/Daily/Daily';
import TaskList from '../../TaskListComponents/TaskList/TaskList';
import Finance from '../../FinanceComponents/Finance/Finance';
import Email from '../../Email/Email'

const Nav = () => {
  const {
    setPage,
  } = useContext(pocketContext);

  const onClick = (pageName) => {
    setPage(pageName)
  }

  return(
  <div className="row s-btw nav">
    <ButtonIcon iconSvg={ svgs.calendar } callback={ () => {onClick(<Calendar />)} } id="1" name="Calendar" />
    <ButtonIcon iconSvg={ svgs.day } callback={ () => {onClick(<Daily />)} } id="2" name="Weekly planer" />
    <ButtonIcon iconSvg={ svgs.taskList } callback={ () => {onClick(<TaskList />)} } id="3" name="Notes" />
    <ButtonIcon iconSvg={ svgs.money } callback={ () => {onClick(<Finance />)} } id="4" name="Finances" />
    <ButtonIcon iconSvg={ svgs.email } callback={ () => {onClick(<Email />)} } id="5" name="Email" />
  </div>)
};

Nav.propTypes = {};

Nav.defaultProps = {};

export default Nav;
