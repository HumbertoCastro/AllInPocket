import React, { useContext } from 'react';
import svgs from '../../helpers/svg';
import ButtonIcon from '../Button-icon/Button-icon';
import pocketContext from '../../context/pocketContext';
import Calendar from '../Calendar/Calendar';
import TaskList from '../TaskList/TaskList';
import Finance from '../Finance/Finance';
import Email from '../Email/Email';
import Daily from '../Daily/Daily';

const Nav = () => {
  const {
    setPage,
  } = useContext(pocketContext);

  const onClick = (pageName) => {
    setPage(pageName)
  }

  return(
  <div className="row s-btw nav">
    <ButtonIcon iconSvg={ svgs.calendar } callback={ () => {onClick(<Calendar />)} } id="1"/>
    <ButtonIcon iconSvg={ svgs.day } callback={ () => {onClick(<Daily />)} } id="2" />
    <ButtonIcon iconSvg={ svgs.taskList } callback={ () => {onClick(<TaskList />)} } id="3" />
    <ButtonIcon iconSvg={ svgs.money } callback={ () => {onClick(<Finance />)} } id="4" />
    <ButtonIcon iconSvg={ svgs.email } callback={ () => {onClick(<Email />)} } id="5" />
  </div>)
};

Nav.propTypes = {};

Nav.defaultProps = {};

export default Nav;
