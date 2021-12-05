import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #7159c1
    }
  }

  aside {
    display: flex;
    align-items: center;
  }

`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    display: flex;
    flex-direction: column;
    margin: 0 20px;

    a {
      font-size: 12px;
      color: #999;
    }
  }
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }


`