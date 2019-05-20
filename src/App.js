import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import "./App.css";
import {
  Container,
  Header,
  Card,
  Image,
  Footer,
  Comment,
  Author
} from "./Components";

function App() {
  return (
    <Container>
      <Query
        query={gql`
          {
            photos {
              url
              author
              comments {
                author
                text
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return data.photos.map(photo => (
            <Card key={photo.url}>
              <Header>{photo.author}</Header>
              <Image src={photo.url} alt={photo.author} />
              <Footer>
                {photo.comments.map(comment => (
                  <Comment key={comment.text}>
                    <Author>{comment.author}</Author>
                    {comment.text}
                  </Comment>
                ))}
              </Footer>
            </Card>
          ));
        }}
      </Query>
    </Container>
  );
}

export default App;
