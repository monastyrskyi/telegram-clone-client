import React from 'react';
import {useSelector} from "react-redux";

import './Dialogs.css';
import {SearchInput} from '../../input/search-input/SearchInput';
import {DialogList} from '../../list/dialog-list/DialogList';
import {RootState} from '../../../redux/rootReducer';

interface Props {
}

export const Dialogs: React.FC<Props> = () => {
  const dialogs = useSelector((state: RootState) => state.dialogs.items);

  return (
    <div className="dialogs-container">
      <SearchInput/>
      <DialogList dialogs={dialogs.filter(dialog => dialog.messages.length > 0)}/>
    </div>
  );
}
