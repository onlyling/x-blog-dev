import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Card } from 'antd';
import ModalModifyPassword from '../../../components/modal-modify-password/modal-modify-password';

import Styles from './security-settings.module.less';

import { FormComponentProps } from 'antd/lib/form/Form';

import * as Store from '../../../store';

const initState = {
  fetching: false
};

const mapStateToProps = ({ User }: Store.iRootState) => ({
  UserInfo: User.UserInfo
});

const mapDispatchToProps = (Dispatch: any) => {
  // const { User } = Dispatch as Store.Dispatch;
  return {};
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & FormComponentProps;
type State = typeof initState;

class Node extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initState;
    this.ModalModifyPassword = React.createRef();
  }

  ModalModifyPassword: any;

  handlerShowModifyPassword = () => {
    this.ModalModifyPassword.showModal();
  };

  render() {
    const { UserInfo } = this.props;

    return (
      <Card bordered={false} title="安全设置">
        <ModalModifyPassword
          userId={UserInfo.id}
          wrappedComponentRef={(form: any) => (this.ModalModifyPassword = form)}
        />

        <ul className={Styles['security-ul']}>
          <li>
            <span>密码安全</span>
            <span className={Styles['c']} onClick={this.handlerShowModifyPassword}>
              修改
            </span>
          </li>

          <li>
            <span>其他</span>
            <span>修改</span>
          </li>
        </ul>
      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node);
