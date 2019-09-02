import React from 'react'
import { Link } from 'gatsby';
import { nFormatter } from '../utils/utils';

const SerieInfo = (data) => {
  const {
    frontmatter,
    handleCardCloseClick,
    slug,
  } = data;
  const { episodes } = frontmatter;
  const limitedEpisodes = episodes.slice(0, 3)
  return (
    <div className="SerieCardInformation">
      <button onClick={handleCardCloseClick} type="button" className="Close" />
      <div className="InformationTitle">
        {frontmatter.title}
      </div>
      <div className="InformationHost">
        {frontmatter.host}
      </div>
      <div className="InformationDesc">
        {frontmatter.description.slice(0, 500)}
      </div>
      <div className="Episodes">
        <span className="EpisodesTitle">Bölümler</span>
        <Link
          to={slug}
          className="EpisodesAll"
        >
          Tümünü Gör
        </Link>
      </div>
      <div className="InformationEpisodes">
        {
          limitedEpisodes.map(episode => (
            <div className="Episode">
              <div
                style={{
                  background: `url(${episode.youtubeURL.imageURL})`,
                  backgroundSize: 'cover',
                  position: 'relative',
                }}
                className="EpisodeVideo"
              >
                <div className="playParavan" />
              </div>
              <div className="minicontainer">
                <span className="subminititle">
                  {`${episode.youtubeURL.title.slice(0, 25)}: ${episode.youtubeURL.description.slice(0, 25)}`}
                </span>
                <span className="details">
                  <span>
                    KanalHayat
                  </span>
                  <span style={{ paddingLeft: '15px' }}>
                    {`• ${nFormatter(episode.youtubeURL.viewCount)}`}
                  </span>
                  {/* {frontmatter.channelTitle} */}
                </span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SerieInfo
