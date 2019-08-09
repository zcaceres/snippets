import styled from 'styled-components'

/**
 * To use text-overflow properties like ellipsis, we need
 * to change the anchor tag's `display` to block or inline-block and set an explicit `width`.
 */
const EllipsisURL = styled.a`
  display        : inline-block;
  overflow-x     : hidden;
  width          : 100%;
  font-size      : 14px;
  white-space    : nowrap;
  text-overflow  : ellipsis;
  overflow       : hidden;
  color          : #2d2d2d;
  text-align     : left !important;
  :hover{
    color: #1e88e5;
  }
`

export default EllipsisURL

