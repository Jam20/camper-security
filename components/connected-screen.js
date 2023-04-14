import { View, TabController, Colors } from 'react-native-ui-lib';
import MusicPage from './music-page';
import HomePage from './home-page';
import SettingsPage from './settings-page';

export default function ConnectedScreen(props) {

    return (
        <TabController initialIndex={1} items={[{ label: 'Music' }, { label: 'Home' }, { label: 'Settings' }]} >
            <View flex width={"100%"} height="100%">
                <TabController.TabPage index={0} lazy><MusicPage /></TabController.TabPage>
                <TabController.TabPage index={1} lazy><HomePage /></TabController.TabPage>
                <TabController.TabPage index={2} lazy><SettingsPage /></TabController.TabPage>
            </View>
            <TabController.TabBar enableShadows backgroundColor="#333333" labelColor="white" selectedLabelColor={Colors.primary} />
        </TabController>
    )
}