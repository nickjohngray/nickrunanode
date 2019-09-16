import { connect } from 'react-redux';
import types from 'renderer/types';
import { storageKeys } from 'renderer/api/utils/storage';
import ROUTES from 'renderer/constants/routes';
import { Logger } from 'renderer/utils/logging';

const mapStateToProps = ({
  appStore: { uiState },
  balances,
  staking,
  localStorage,
  nodeStateStore: { wsLocalStatus },
}) => ({
  balances,
  uiState,
  staking,
  wallets: localStorage[storageKeys.WALLETS],
  stakingStashAccountAddress: localStorage[storageKeys.STAKING_STASH_ACCOUNT_ADDRESS],
  stakingStashWalletId: localStorage[storageKeys.STAKING_STASH_WALLET_ID],
  wsLocalStatus,
});

const mapDispatchToProps = dispatch => ({
  onStake: () => {
    dispatch({
      type: types.navigation.triggered,
      payload: ROUTES.STAKING.STAKE,
    });
  },
  onUnStake: payload => {
    Logger.debug('onUnStake');
    dispatch({ type: types.unStake.triggered, payload });
  },
  onSyncWalletData: payload => {
    Logger.debug('onSyncWalletData');
    dispatch({ type: types.syncWalletData.requested, payload });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
