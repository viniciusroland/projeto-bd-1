import React, { forwardRef } from 'react';
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Container, TextInput } from './styles';

function Input({ icon, style, ...rest}, ref) {
  return (
    <Container style={style}>
      { icon && <Icon name={icon} size={20} color="rgba(255, 255, 255, 0.6)" />}
      <TextInput {...rest} ref={ref} />
    </Container>
  );
}

//Input.PropTypes = {
//  style : PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
//  icon : PropTypes.string
//}
//
//Input.defaultProps = {
//  style : {},
//  icon : null
//}

export default forwardRef(Input)