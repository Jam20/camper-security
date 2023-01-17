
import { View, Text, Slider, TabController} from 'react-native-ui-lib';
import MusicPage from './music-page';
import HomePage from './home-page';
import SettingsPage from './settings-page';

const maxVal = 8191
const minVal = 1

export default function ConnectedScreen(props) {

    return (
        <TabController initialIndex={1} items={[{label: 'Music' }, {label: 'Home'}, {label: 'Settings'}]}>
            <View flex>
                <TabController.TabPage index={0} lazy><MusicPage/></TabController.TabPage>
                <TabController.TabPage index={1} lazy><HomePage/></TabController.TabPage>
                <TabController.TabPage index={2} lazy><SettingsPage/></TabController.TabPage>
            </View>
            <TabController.TabBar enableShadows/>
       </TabController>
    )
}