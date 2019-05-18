import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import "./App.css";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "50px"
      }}
    >
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
            <div
              key={photo.url}
              style={{
                border: "1px solid #e6e6e6",
                borderRadius: "3px",
                marginBottom: "50px",
                backgroundColor: "#fff"
              }}
            >
              <div
                style={{ padding: "16px", fontSize: "14px", fontWeight: 800 }}
              >
                {photo.author}
              </div>
              <img
                style={{ width: "400px" }}
                src={photo.url}
                alt={photo.author}
              />
              <div style={{padding: 16}}>
              {photo.comments.map(comment => (
                <div style={{ display: 'flex', marginBottom: 6 }} key={comment.text}>
                  <div style={{ fontWeight: 800, marginRight: "10px" }}>
                    {comment.author}
                  </div>
                  {comment.text}
                </div>
              ))}
            </div>
            </div>
          ));
        }}
      </Query>
    </div>
  );
}

export default App;
