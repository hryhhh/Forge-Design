import { useState } from 'react';
import React from 'react';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical';
type handleClick = (index: number) => void;
export interface MenuProps{
    defaultIndex?: number;
    mode?: MenuMode;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onSelect?: (selectedIndex: number) => void;
    
}
interface IMenuContext {
  index: number;
  onSelect?: handleClick;
}
export const MenuContext=React.createContext<IMenuContext>({index:0})
const Menu: React.FC<MenuProps> = ({
    defaultIndex = 0,
    mode = 'horizontal',
    className,
    style,
    children,
    onSelect,
    
}) => {
    const [currentActive, setActive] = useState(defaultIndex);
    const classes = classNames(
        'menu',
        className,
        { 'menu-vertical': mode === 'vertical'}
    );
    const handleClick = (index: number) => {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    const passedContext: IMenuContext = {
            index: currentActive ? currentActive : 0,
            onSelect: handleClick,
        }
    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                {children}
            </MenuContext.Provider>
           
        </ul>
    ); 
}
export default Menu;