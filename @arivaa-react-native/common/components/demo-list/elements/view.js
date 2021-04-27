import React from 'react';
import styles from './styles';
import { ScrollView, View, Text } from 'react-native';
import { List } from '@ant-design/react-native';
import { LinkBack } from '../../link';

const Item = List.Item;

var view = function () {
  const { data, disableBackBtn } = this.props;
  return (
    <View style={[styles.container]}>
      {!disableBackBtn && (
        <View style={[styles.back]}>
          <LinkBack />
        </View>
      )}
      <ScrollView>
        <View style={[styles.content]}>
          {(data || []).map((demo, demoIndex) => {
            return (
              <View style={[styles.elements]} key={demoIndex}>
                <List
                  renderHeader={() => (
                    <Text style={[styles.header]}>{demo.name}</Text>
                  )}
                >
                  {(demo.components || []).map((component, componentIndex) => {
                    return (
                      <Item
                        key={componentIndex}
                        arrow="horizontal"
                        onClick={this.goToComponent.bind(this, component)}
                      >
                        {component.name}
                      </Item>
                    );
                  })}
                </List>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
module.exports = view;
