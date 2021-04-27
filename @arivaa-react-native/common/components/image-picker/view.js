import React from 'react';
import styles from './styles';
import { TouchableHighlight, View } from 'react-native';
import Thumbnail from '../thumbnail';
import Button from '../button';
import { getImage } from '../util';
import Icon from '../icon';
import ModalTrigger from '../modal/modal-trigger';

/**
 * View
 * @returns {XML}
 */
var view = function () {
  const {
    children,
    getChildren,
    thumbnailProps,
    imageWidth,
    imageHeight,
    imageStyle,
    containerStyle,
    closable,
    closeButtonProps,
    placeholder,
    buttonProps,
    modalStyles,
    cameraButtonTitle,
    galleryButtonTitle,
    cancelButtonTitle,
    disableCamera,
    disableGallery,
    addImageMarkUp,
  } = this.props;
  const propStyles = this.props.styles || {};
  const { value, childWidth } = this.state;
  let markup;
  const modalContent = (
    <View>
      {!disableCamera && (
        <Button
          type="bordered"
          size="large"
          style={[styles.button]}
          {...buttonProps}
          onPress={this.openCamera.bind(this)}
        >
          {cameraButtonTitle || 'Camera'}
        </Button>
      )}
      {!disableGallery && (
        <Button
          type="bordered"
          size="large"
          style={[styles.button]}
          {...buttonProps}
          onPress={this.openGallery.bind(this)}
        >
          {galleryButtonTitle || 'Gallery'}
        </Button>
      )}
      <Button
        type="primary"
        size="large"
        style={[styles.button]}
        {...buttonProps}
        onPress={this.onCancel.bind(this)}
      >
        {cancelButtonTitle || 'Cancel'}
      </Button>
    </View>
  );
  const ModalTriggerWrapper = ({
    children: modalTriggerChildren,
    ...modalTriggerProps
  }) => {
    return (
      <ModalTrigger
        content={modalContent}
        ref={(ref) => {
          this.modal = ref;
        }}
        modalProps={{
          styles: {
            modalContent: {
              padding: 10,
              height: 200,
            },
            scrollView: {
              justifyContent: 'center',
            },
            ...modalStyles,
          },
        }}
        {...modalTriggerProps}
      >
        {modalTriggerChildren}
      </ModalTrigger>
    );
  };
  if (children) {
    let modifiedChildren = React.cloneElement(children, {
      //Commented this as it caused infinite loop of set states
      // onLayout: (e) => {
      //   const { width, height } = e.nativeEvent.layout;
      //   this.setState({
      //     childWidth: width,
      //   });
      // },
    });

    markup = (
      <ModalTriggerWrapper>
        <TouchableHighlight
          underlayColor={'transparent'}
          style={[
            //childWidth ? { width: childWidth } : null,
            containerStyle,
            propStyles.container,
          ]}
        >
          {modifiedChildren}
        </TouchableHighlight>
      </ModalTriggerWrapper>
    );
  } else {
    if (getChildren && getChildren instanceof Function) {
      let modifiedChildren = getChildren(this.getExposedConfig());
      if (!modifiedChildren) {
        console.warn('getChildren function returned null for image picker');
      }
      markup = (
        <ModalTriggerWrapper>
          <TouchableHighlight
            underlayColor={'transparent'}
            style={[
              childWidth ? { width: childWidth } : null,
              containerStyle,
              propStyles.container,
            ]}
          >
            {modifiedChildren}
          </TouchableHighlight>
        </ModalTriggerWrapper>
      );
    } else {
      markup = (
        <View style={propStyles.container}>
          <View
            style={[
              styles.image,
              // {
              //   width: imageWidth || 100,
              //   height: imageHeight || 100,
              // },
              propStyles.imagePicker,
            ]}
          >
            {value && (
              <Thumbnail
                borderRadius={5}
                icon={'image'}
                {...thumbnailProps}
                source={getImage(value)}
                style={[
                  imageStyle,
                  {
                    width: imageWidth || 100,
                    height: imageHeight || 100,
                  },
                  thumbnailProps ? thumbnailProps.style : null,
                  propStyles.thumbnail,
                ]}
              />
            )}

            {!(typeof closable !== 'undefined' && !closable) && value ? (
              <Button
                type="rounded"
                text={
                  <Icon
                    type={'ionicons'}
                    name={'md-close'}
                    style={[styles.icon]}
                  />
                }
                {...closeButtonProps}
                style={[
                  styles.removeBtn,
                  closeButtonProps ? closeButtonProps.style : null,
                  propStyles.closeButton,
                ]}
                onClick={this.clearFile.bind(this)}
              />
            ) : null}
          </View>
          {!value ? (
            <ModalTriggerWrapper>
              {addImageMarkUp ? (
                addImageMarkUp
              ) : (
                <TouchableHighlight underlayColor="transparent">
                  <Thumbnail
                    borderRadius={5}
                    icon={'plus'}
                    iconStyle={[styles.thumbnailIconStyle]}
                  />
                </TouchableHighlight>
              )}
            </ModalTriggerWrapper>
          ) : null}
        </View>
      );
    }
  }
  return <View style={propStyles.mainContainer}>{markup}</View>;
};
module.exports = view;
