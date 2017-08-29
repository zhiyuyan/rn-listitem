/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View
} from 'react-native';
import {
  BasePage,
  ToolBar,
  FontSize,
  StaticColor,
  ItemAvatarTitleButton,
  ItemAvatarTitleTime,
  ItemPicTitleProgress,
  ItemDoubleSubtitle,
  ItemBigAvatar,
  ItemSmallAvatar,
  ItemSmallIcon,
  ItemMultiLineSubtitle,
  ItemMultiLineContent,
  ItemSearchResult
} from './src/views/widget/listitem';

export default class EListItemProject extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([
        { type: 'ItemAvatarTitleTime' },
        { type: 'ItemAvatarTitleButton' },
        { type: 'ItemPicTitleProgress' },
        { type: 'ItemDoubleSubtitle' },
        { type: 'ItemBigAvatar' },
        { type: 'ItemSmallAvatar', showCheckbox: true },
        { type: 'ItemSmallAvatar', showCheckbox: false },
        { type: 'ItemSmallIcon', showCheckbox: true, showHeader: true },
        { type: 'ItemSmallIcon', showCheckbox: false },
        { type: 'ItemMultiLineSubtitle' },
        { type: 'ItemMultiLineSubtitle' },
        { type: 'ItemSearchResult', showHeader: true },
        { type: 'ItemSearchResult', showSearchMore: true }
      ])
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID, highlightRow) => {
            switch (rowData.type) {
              case 'ItemAvatarTitleTime':
                return (
                  <ItemAvatarTitleTime
                    avatar={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
                    title={'Jonn'}
                    subtitle={'John aaaaa'}
                    time={'1:30'}
                    count={123}
                    onItemClick={(itemData) => { console.log(itemData) }} />
                );
              case 'ItemAvatarTitleButton':
                return (
                  <ItemAvatarTitleButton
                    avatar={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
                    title={'Jonn'}
                    subtitle={'John aaaaa'}
                    checked={true}
                    checkedText={'已下载'}
                    unCheckedText={'下载'}
                    onButtonClick={(checked) => { console.log(checked) }}
                    onItemClick={(itemData) => { console.log(itemData) }} />
                );
              case 'ItemPicTitleProgress':
                return (
                  <ItemPicTitleProgress
                    pic={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
                    title={'Jonn'}
                    subtitle={'John aaaaa'}
                    progress={0.6}
                    onItemClick={(itemData) => { console.log(itemData) }} />
                );
              case 'ItemDoubleSubtitle':
                return (
                  <ItemDoubleSubtitle
                    pic={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
                    title={'Jonn'}
                    firstSubtitle={'first subtitle adfadfasdfasdfadfadfaaaaa'}
                    secondSubtitle={'second subtitle adfadsfbsdfaaaaaaaaaaa'}
                    onItemClick={(itemData) => { console.log(itemData) }} />
                );
              case 'ItemBigAvatar':
                return (
                  <ItemBigAvatar
                    avatar={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
                    title={'Jonn'}
                    firstSubtitle={'first subtitle'}
                    secondSubtitle={'second subtitle adfadsfbsdfaaaaaaaaaaaadgasdgasdgasdgadgasd'}
                    onItemClick={(itemData) => { console.log(itemData) }} />
                );
              case 'ItemSmallAvatar':
                return (
                  <ItemSmallAvatar
                    avatar={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
                    title={'Jonn'}
                    subtitle={'first subtitle'}
                    showCheckbox={rowData.showCheckbox}
                    onItemClick={(itemData) => { console.log(itemData) }}
                    onCheckboxClick={(checked) => { console.log(checked) }} />
                );
              case 'ItemSmallIcon':
                return (
                  <ItemSmallIcon
                    pic={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
                    title={'Jonnaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}
                    showCheckbox={rowData.showCheckbox}
                    showHeader={rowData.showHeader}
                    header={'标题'}
                    onItemClick={(itemData) => { console.log(itemData) }}
                    onCheckboxClick={(checked) => { console.log(checked) }} />
                );
              case 'ItemMultiLineSubtitle':
                return (
                  <ItemMultiLineSubtitle
                    pic={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
                    title={'Jonnaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}
                    subtitle={'adssssssssasdfasdfasdfadgadgahadhadfadsfadsfagagadgadfadfagdagetqrytjhkjriutuhssssssssssssssffasdfasgaadfadsfasdfadfadfadfadfasdfasdfadfdsgadsfhasdfasdjfa;dsjf;ajaaaaaasdfagfgagafgafgagafgafdgafgaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadf;ajdfjakdjfkajdkfjaldfjlasjdflkadsf'}
                    time={'12:30'}
                    onItemClick={(itemData) => { console.log(itemData) }} />
                );
              case 'ItemSearchResult':
                return <ItemSearchResult
                  showHeader={rowData.showHeader}
                  header={'联系人'}
                  pic={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
                  title={'Jonnaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}
                  firstSubtitle={'firstSubtitle'}
                  secondSubtitle={'adfadfasdf'}
                  showSearchMore={rowData.showSearchMore}
                  searchMoreText={"查看更多"}
                  onItemClick={(itemData) => { console.log(itemData) }}
                  onSearchMoreClick={() => { console.log("onSearchMoreClick()") }} />
              default:
                return <Text>未知类型</Text>
            }

          }
          }
        />
      </View>
    );
  }

}

AppRegistry.registerComponent('EListItemProject', () => EListItemProject);
