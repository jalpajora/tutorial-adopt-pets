import React from "react";
import pet, { Photo } from "@frontendmasters/pet";
import { navigate, RouteComponentProps } from "@reach/router";

import Modal from "./Modal";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

class Details extends React.Component<RouteComponentProps<{ id: string }>> {
  public state = {
    loading: true,
    showModal: false,
    name: "",
    animal: "",
    location: "",
    description: "",
    media: [] as Photo[],
    breed: "",
    url: "",
    hasError: false
  };

  public componentDidMount() {
    if (!this.props.id) {
      navigate("/");
      return;
    } else {
      pet
        .animal(+this.props.id)
        .then(({ animal }) => {
          if (typeof animal === "undefined") {
            this.setPageError();
          } else {
            this.setState({
              name: animal.name,
              animal: animal.type,
              location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
              description: animal.description,
              media: animal.photos,
              breed: animal.breeds.primary,
              url: animal.url,
              loading: false
            });
          }
        })
        .catch(() => this.setPageError());
    }
  }

  public toggleModal = () =>
    this.setState({ showModal: !this.state.showModal });

  public adopt = () => navigate(this.state.url);

  public setPageError() {
    this.setState({ hasError: true, loading: false });
  }

  public render() {
    if (this.state.loading) {
      return <h1>Loading..</h1>;
    }

    if (this.state.hasError) {
      throw new Error("Animal Detail not found");
    }

    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      showModal
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default function DetailsErrorBoundary(
  props: RouteComponentProps<{ id: string }>
) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
