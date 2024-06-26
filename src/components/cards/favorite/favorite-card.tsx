import { OfferType } from '../../../constant/types';
import { Link } from 'react-router-dom';
import { getStarsFromRating } from '../../../constant/utils';
import { useState } from 'react';
import { setOfferFavoriteStatusAction } from '../../../store/api-actions';
import { useAppDispatch } from '../../../hooks';

export type FavoriteCardParams = {
  offer: OfferType;
}

export default function FavoriteCard({ offer }: FavoriteCardParams): JSX.Element {
  const dispatch = useAppDispatch();
  const [isFavoriteOffer, setFavoriteOffer] = useState<boolean | null>(offer.isFavorite);

  const handleFavoriteButtonClick = () => {
    dispatch(setOfferFavoriteStatusAction({id: offer.id, favoriteStatus: !isFavoriteOffer}));
    setFavoriteOffer(!isFavoriteOffer);
  };


  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`} state={offer}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavoriteOffer ? 'place-card__bookmark-button--active' : ''} button`} onClick={handleFavoriteButtonClick} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getStarsFromRating(offer.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`} state={offer}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
