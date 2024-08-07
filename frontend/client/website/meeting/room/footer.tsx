import { ReactElement } from 'react'
import {
   ControlBar,
   AudioInputControl,
   VideoInputControl,
   ContentShareControl,
   ControlBarButton,
   Phone
} from 'amazon-chime-sdk-component-library-react'
import { navigateDashboard } from '@/app/actions'
import styles from './footer.module.css'

type FooterProps = {
   endMeeting: () => void;
};

export default function Footer({ endMeeting }:FooterProps):ReactElement {


   const hangUpButtonProps = {
      icon: <Phone />,
      onClick: () => {
         void endMeeting()
         void navigateDashboard()
      },
      label: 'End',
   }

    return (
          <ControlBar
             className={styles.footer}
             layout="undocked-horizontal"
             showLabels
          >
             {/*These two throw error in Chrome console: */}
             {/*Invalid DOM property `transform-origin`.*/}
             <AudioInputControl className={styles.audio} />
             <VideoInputControl className={styles.video} />
             {/*--------------------------------*/}
             <ContentShareControl className={styles.share} />
             <ControlBarButton className={styles.hangup} {...hangUpButtonProps} />
          </ControlBar>

    )
}