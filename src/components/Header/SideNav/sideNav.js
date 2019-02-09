import React from 'react';
import SideNav from 'react-simple-sidenav';
import SideNavItems from './sideNav_items';

const sideNavigation = (props) => {
    return(
      <div>
        {/** 캐치해야 하는 props 
       showNav={this.state.showNav}
       onHideNav={()=> this.togglesidenav(false)}
       onOpenNav={()=> this.togglesidenav(true)}
       /> */}
        <SideNav
        showNav={props.showNav}
        onHideNav={props.onHideNav}
        navStyle={{
          background: '#242424',
          maxWidth: '220px'
        }}
        >
         {/**이 부분에서 sidenav의 option을 렌더링 */}
         <SideNavItems {...props}
         />
        </SideNav>
      </div>
    )
}

export default sideNavigation;