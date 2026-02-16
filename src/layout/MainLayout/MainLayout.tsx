import styles from './MainLayout.module.scss';
import { Link, Outlet } from 'react-router-dom';
import { routerData } from '../../router/router';

export const MainLayout = () => {
  return (
    <div className={styles.mainLayout}>
      <div className={styles.navMenuContainer}>
        <div className={styles.navMenu}>
          <Link to={'/'} className={styles.navMenu_logo}>
            <img src={'/logo.svg'} alt={''} />
          </Link>

          <div className={styles.navMenu_list}>
            {routerData.map((item) => {
              return (
                <Link key={item.id} to={item.path} className={styles.list_item}>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
