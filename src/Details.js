import React from "react";
import pet from "@frontendmasters/pet";
import { navigate } from "@reach/router";
import { connect } from "react-redux";

import Modal from "./Modal";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

class Details extends React.Component {
  state = { loading: true };

  constructor(props) {
    super(props);
    this.state = { loading: true, showModal: false };
  }

  componentDidMount() {
    pet
      .animal(this.props.id)
      .then(({ animal }) => {
        if (typeof animal == "undefined") {
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

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  adopt = () => navigate(this.state.url);

  setPageError() {
    this.setState({ hasError: true, loading: false });
  }

  render() {
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
          <button
            onClick={this.toggleModal}
            style={{ backgroundColor: this.props.theme }}
          >
            Adopt {name}
          </button>
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

const mapStateToProps = ({ theme }) => ({ theme });

const WrappedDetails = connect(mapStateToProps)(Details);

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <WrappedDetails {...props} />
    </ErrorBoundary>
  );
}
