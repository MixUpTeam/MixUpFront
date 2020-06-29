import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ShareIcon from '@material-ui/icons/Share';
import { message } from 'antd';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import './style.scss';

const ShareButton = () => {
  const handleClick = () => {
    return message.success(
      'Link copied to clipboard and ready to be shared.',
      3
    );
  };

  return (
    <div className="share-button">
      <CopyToClipboard text={window.location.href}>
        <Tooltip
          title="Share playlist"
          aria-label="add"
          TransitionComponent={Zoom}
          enterDelay={200}
          leaveDelay={200}
        >
          <Fab color="primary">
            <ShareIcon onClick={handleClick} style={{ cursor: 'pointer' }} />
          </Fab>
        </Tooltip>
      </CopyToClipboard>
    </div>
  );
};

export default ShareButton;
