import React from 'react';
import SlideDown from 'react-slidedown';

const classNames = require('classnames');

class WritingPM extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentOpen: 'hipHop',
      expand: false
		}

    this.changeContent = this.changeContent.bind(this);
  }

  changeContent(content) {
    this.setState({ contentOpen: content });
  }


		render() {
	    return (
	      <div>
					<div className="tab contain">
						<div className="tab h" onClick={() => {this.changeContent('hipHop')}}>
							<h3>Hip-hop</h3></div>
	          <div className="tab h" onClick={() => {this.changeContent('jazz')}}>
							<h3>Jazz</h3></div>
	          <div className="tab h" onClick={() => {this.changeContent('classical')}}>
							<h3>Classical</h3></div>
	          <div className="tab h" onClick={() => {this.changeContent('art')}}>
							<h3>Korean Art Songs</h3></div>
					</div>

					{this.state.contentOpen == "hipHop" &&
						<div>
							<div className="mov">
								<div className="text">
									<h1>Hip-hop</h1>
									<h2>Elephant Rebellion and Suwan Choi</h2>
									<p><b>TJ “TJ GT” Ayodele<br/>
									 	Elgin “DJ LOKari” Bokari<br/>
										Mergen “Monotone” Batdelger</b><br/>
										<b>Suwan Choi</b>, jang-gu</p>
								</div>

								<iframe width="560" height="315" src="https://www.youtube.com/embed/hZGiu7k9iFA" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
							</div>

							<div className="card">
								<h1 className="title">Pieces</h1>
								<h3 className="b">"They Say Go"</h3>
								<p>based on "Still American" by <a href="/writing/past/2013/winnerssijo.php#1">Roberto Santos</a></p>
								<p>“They Say Go” is comprised of a series of six sijo and one free verse poem, each one written by a member of Elephant Rebellion in response to “Still American.” &nbsp;
								<button onClick={() => {this.setState({expand: !this.state.expand})}}>Expand for full lyrics</button></p>
								<SlideDown>
                { this.state.expand ?
  								<blockquote>
  									<p><b>Poem 1: Ona Wong</b><br/>
  									Learn English: the official language. This is America.<br/>
  									Are you dumb? That’s what they say:<br/>
  									Teachers, couns’lers, special ed class.<br/>
  									Speaking Shawnee on First Nations Land.<br/>
  									America. Where is that?<br/><br/>
  									<b>Poem 2: Uran Kabashi ("Fu Gee La")</b><br/>
  									Its hard for me, to speak the past, refugee, a lethal path.<br/>
  									But now I’m here, awoken life, its broken right, there’s hope tonight<br/>
  									open lights, and then I speak the truth, at an open mic, with the youth.<br/><br/>
  									<b>Poem 3: Mewael "Mo Beats" Michael ("American No Dream")</b><br/>
  									I hear a sound that is shockingly disturbing my dreams<br/>
  									They call it an alarm clock, and it’s supposed to wake you up<br/>
  									But when I wake up, I feel more asleep than when I’m dreaming<br/><br/>
  									<b>Poem 4: Elgin "DJ Lokari" Bokari ("Lorena Bu&ntilde;i's Poem")</b><br/>
  									She left home borrowed money took the plane to a foreign land.<br/>
  									She worked hard for her young child, her aging mom and ailing dad.<br/>
  									Now she’s home, balikbayan box she is flown in, modern day slave.<br/><br/>
  									<b>Poem 5: Mergen "Monotone" Batdelger</b><br/>
  									I say, I cannot for I have never attempted<br/>
  									I don’t know for I have yet to unravel the truth<br/>
  									But how dare I answer questions I have yet to question<br/>
  									always been a foreigner on a quest,<br/>
  									alienated based on where I was born at<br/><br/>
  									<b>Poem 6: Angel Pantoja</b><br/>
  									They call my people criminals<br/>
  									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;saying we’ve stolen all their jobs<br/>
  									We who leave behind our families<br/>
  									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to work in fields all day<br/>
  									America, you criminals;<br/>
  									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;let us correct your twisted ways<br/><br/>
  									<b>Poem 7: Micah Gray</b><br/>
  									Who can stop—humanity’s—<br/>
  									Deceptive ways—can someone see<br/>
  									It is me—the one who lives—<br/>
  									Searching for love—in this new age<br/>
  									Gifted be—the messenger who—flies ahead with—(battered wings) x2</p>
  								</blockquote>
                : null }
								</SlideDown>
								<h3 className="b">"Still American"</h3>
								<blockquote>
									<p><b>Still American</b><br/>
										They say go, return to land that I don't know. It makes no sense.<br/>
										Born and raised American, so Mexico is still foreign.<br/>
										Culture kept, but this is my home. Immigrant, no: Hispanic.</p>
								</blockquote>
								<p>“Still American” received first place in the 2013 Sejong Writing Competition for pre-college students. At the time of writing, author Roberto Santos was in 12th grade and a student at John B. Alexander High School in Laredo, TX.</p>
								<blockquote>
									<p>I'm <b>Roberto Santos</b>, an 18-year-old senior at John B. Alexander High School. I had first heard of the Sejong Writing Competition as a class assignment for my English 4 class, and winning first place came as a great surprise! Without my teacher pushing the class to join, I  probably would've never done it out of fear of failure. The fact that I won something for just writing thoughts I’ve always had with a creative twist still blows my mind!</p>
									<p>I live in a border town made up of a Hispanic/Mexican majority, where Spanish is spoken just as much as English; although I’m proud of my heritage, English is still my primary language. In my spare time I make music with my friends and spend time with my family. I plan on majoring in musical engineering and help expose  some of my talented friends’ music.</p>
									<p className="attribute">(2013)</p>
								</blockquote>

								<h3 className="b">"Be Here"</h3>
								<p>based on "Chung-sang-ri" by Hwang Chin-i (c. 1506-1560)</p>
								<blockquote>
									<p><b>Chung-sang-ri</b> (Jade Green Stream)<br/>
									Jade Green Stream, Don’t boast so proud of your easy passing through these blue hills<br/>
									Once you have reached the broad sea, to return again will be hard,<br/>
									While the Bright Moon fills these empty hills, why not pause? Then go on, if you will.	</p>
								</blockquote>
								<p><b>Hwang Chin-i</b> 황진이 (1506-1544) is perhaps the most famous courtesan (<em>gisaeng</em>) in Korean history. She was particularly noted for her exceptional beauty, charming quick wit, extraordinary intellect, mastery of the fine arts&mdash;including dancing, music, painting, and poetry&mdash;and her assertive and independent nature. She has become somewhat of a myth-like figure in modern Korea, inspiring novels, operas, films, and television shows.</p>
								<p>However, few of her sijo and musical compositions have survived, as she was denounced and vilified immediately after her death for her status as a courtesan.  There has been some speculation amongst academics that this sentiment was prompted by jealous contemporaries.</p>
							</div>

							<h1 className="title">Artists</h1>
							<p><b>Elephant Rebellion</b> is a collective of artists and activists dedicated to empowering communities through the power of arts and education. They began organizing after their friend and fellow artist/activist John Vietnam Nguyen passed away. He left behind a legacy of inspiring change in the community through positive action and self-determination. Since then they have grown to become an organization that has been giving back to our community through music, dance, poetry, educational workshops and much more. They currently organize at Bridgeview Bank in the Uptown neighborhood of Chicago, IL.</p>
							<p className="last">Elephant Rebellion's website can be found at <a href="http://www.elephantrebellion.org/">www.elephantrebellion.org</a>.</p>
							<p><b>Suwan Choi</b> (<em>jang-gu</em>), a Korean traditional musican, is an Artist-in-Residence at the Global Pungmul Institute of Chicago. He received a Bachelor of Arts in Korean Traditional Performing Arts. He is a former performance director of the Korean traditional performing arts troupe NJ&P and was a grand prize winner at the World Samulnori Competition in Korea. Choi recently performed at the Chicago Asian American Jazz Festival. The <em>jang-gu</em> is the most widely used drum in the traditional music of Korea. The first depiction of the instrument is in a mural inside a tomb dating back to the Goguryeo kingdom (37 BC—935 AD), a predecessor to modern-day Korea. The jang-gu has an hourglass-shaped body with two sides, called heads, made from animal skin. The two heads are played with bamboo sticks, mallets, or hands. Each head produces a different sound in pitch and timbre; when played together, they are believed to represent the harmony of man and woman. </p>
						</div>
					}
					{this.state.contentOpen == "jazz" &&
						<div className="mov">
							<div className="text">
								<h1>Jazz</h1>
								<h2>Columbia College Chicago Jazz Combo</h2>
									<p><b>Adam Dib</b>, alto saxophone<br/>
										<b>Michael Hilgendorf</b>, guitar <br/>
										<b>Zane DeBord</b>, bass <br/>
										<b>Lyle Luckett</b>, percussion<br/>
										<b>Scott Hall</b>, composer</p>
							</div>
							<iframe width="560" height="315" src="https://www.youtube.com/embed/VkH1FPlkaJg" frameBorder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
							<div className="card">
								<h1 className="title">Pieces</h1>
									<h3 className="b">"Bass Strings"</h3>
										<p>composed by Scott Hall<br/>
											based on "Tennis" by Linda Sue Park</p>
										<p>About "Bass Strings"</p>
									<h3 className="b">"Tennis"</h3>
										<blockquote>
											<p><b>Tennis</b><br/>
												When the professionals play,<br/>
												it’s like watching a metronome:<br/>
												Racquet to racquet and back again,<br/>
												the ball keeps a perfect, steady beat.<br/><br/>
												When I’m on the court with my friends,<br/>
												we improvise: jazz, hip-hop.</p>
										</blockquote>
										<p>About Linda Sue Park</p>
								<h1 className="title">Artists and Composers</h1>
									<h1 className="b">Columbia College Chicago Jazz Combo</h1>
									<h1 className="b">Scott Hall</h1>
							</div>
						</div>
					}
					{this.state.contentOpen == "classical" &&
						<div className="mov">
							<div className="text">
								<h1>Contemporary Classical</h1>
								<p><b>Yoorhi Choi</b>, violin<br/>
									<b>Sojung Lee</b>, piano<br/>
									<b>Misook Kim</b>, composer</p>
								<p><b>Gretchen Adams</b>, mezzo-soprano<br/>
									<b>Allegra Montanari</b>, cello<br/>
									<b>Jennifer Woodrum</b>, clarinet<br/>
									<b>Teddy Niedermaier</b>, composer</p>
							</div>
							<iframe width="560" height="315" src="https://www.youtube.com/embed/2saZZb3NEbg" frameBorder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
							<div className="card">
								<h1 className="title">Pieces</h1>
									<h3 className="b">"Ga-Go-Pa"</h3>
										<p>composed by Misook Kim<br/>
											based on "Nostalgia" by Yi Un-Sang</p>
										<p>About "Bass Strings"</p>
									<h3 className="b">"Nostalgia"</h3>
										<blockquote>
											<p><b>Nostalgia</b>, <em>translated by Jang Gyong-ryol</em><br/>
												Vividly I see in my mind’s eye the Southern Sea so blue and serene.<br/>
												How can I forget even in dreams that serene waters of my hometown?<br/>
												Even now, the seabirds would greet me. Oh, I wish I were back home!<br/><br/>
												I miss those friends of mine whom I played with when I was a child.<br/>
												Wherever I go and wherever I am, how can I ever forget them?<br/>
												How are they doing these days? Oh, I wish I met them again!<br/><br/>
												While seabirds and friends are all still there at my hometown,<br/>
												How and why have I come to leave my hometown and live alone?<br/>
												Shall I go back home right now, leaving everything behind?<br/><br/>
												Oh, how I long to go back home and mingle with them as before!<br/>
												How I long to live there and laugh as I did as a child in festive attire!<br/>
												How I long to go back to those days when there were no tears at all! </p>
										</blockquote>
										<p>About Yi Un-Sang</p>
									<h3 className="b">"Trio"</h3>
										<p>composed by Teddy Niedermaier<br/>
											based on sijo by Yi Myunghan, Hwang Chin-i, and Yang Sa Eun</p>
										<p>About "Trio"</p>
									<h3 className="b">Three Poems</h3>
										<blockquote>
											<p><b>untitled</b> by Yi Myunghan<br/>
											If on the pathways of dreams <br/>
																&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;left a footprint marks<br/>
																The rough road with rocks by your window <br/>
															&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;would soon wear smooth.<br/>
															But in dreams paths take no footprints.<br/>
															&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I mourn the more for that.</p>
											<p><b>Chung-sang-ri</b> by Hwang Chin-i<br/>
											Jade Green Stream, don’t boast so proud of your easy passing through these blue hills. <br/>
											Once you have reached the broad sea, to return again will be hard. <br/>
											While the Bright Moon fills these empty hills, why not pause? Then go on, if you will. </p>
											<p><b>untitled</b> by Yang Sa Eun<br/>
											Soaring high though a mountain may be, <br/>
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;it is a mere mound beneath the Heavens <br/>
											Climb and climb, <br/>
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and no summit cannot be reached <br/>
											Yet the people stay at its base <br/>
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;they say the mountain is too high.</p>
											</blockquote>
										<p>About Yi Un-Sang</p>
								<h1 className="title">Artists and Composers</h1>
									<h1 className="b">everyone</h1>
							</div>
						</div>
					}
					{this.state.contentOpen == "art" &&
						<div className="mov">
							<div className="mov">
								<div className="text">
									<h1>Korean Art Songs</h1>
									<p><b>Ghibong Kim</b>, baritone<br/>
									 	<b>Sojung Lee</b>, piano</p>
								</div>

								<iframe width="560" height="315" src="https://www.youtube.com/embed/HFInmnQ7vTc" frameBorder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
							</div>

							<div className="card">
								<h1 className="title">Pieces</h1>
									<h3 className="b">"The Swing"</h3>
										<p>composed by Gum Suhyun (1919-1992), based on sijo by Kim Mal-bong (1901-1961)</p>
										<blockquote>
											<p><b>The Swing</b>, <em>translated by Jang Gyong-ryol</em><br/>
												Jade-colored fine ramie-cloth skirt and gilt pigtail ribbons<br/>
												are leaping into the blue sky and fluttering in the clouds.<br/>
												A startled swallow stares at them, forgetting to beat its wings.<br/><br/>
												As she pushes off once, she soars as high as to the treetop.<br/>
												As she pushes off twice, the world lays itself flat beneath her feet.<br/>
												Myriad worries of the mind are all blown away in the wind.</p>
									</blockquote>
									<h3 className="b">"Stars"</h3>
										<p>composed by Lee Soo-in (b. 1939), based on sijo by Yi Pyong-gi (1891-1968)</p>
										<blockquote>
											<p><b>Stars</b>, <em>translated by Jaihiun Kim</em><br/>
												The air is cool and pleasant as I step into my courtyard.<br/>
												The sky has cleared above the peaks to the west.<br/>
												And a slice of moon appears with the coming of the stars. <br/><br/>
												Now the moon sinks, the stars signal to one another.<br/>
												Whose stars can they be? Which one is mine?<br/>
												Standing alone in the night, I count them one by one. </p>
												</blockquote>
									<h3 className="b">"Spring Maiden"</h3>
										<p>composed by Hong Nan-pa (1898-1941), based on sijo by Yi Un-sang (1903-1982)</p>
										<blockquote>
											<p><b>Spring Maiden</b>, <em>translated by Jaihiun Kim</em><br/>
												Here comes at last our Spring Maid<br/>
												dressed in shoots of grass,<br/>
												veiled in a fleecy cloud,<br/>
												shod with pearls of dew.<br/>
												Who will she be meeting,<br/>
												a bouquet pinned on her breast?<br/><br/>
												Will she ever pass my house<br/>
												on her way to meet her lover?<br/>
												Or is she coming for me?<br/>
												I don’t know.<br/>
												Shall I go and make a fool of myself<br/>
												and ask her where she is going ?</p>
										</blockquote>

							<h1 className="title">Artists</h1>
								<p><b>Ghibong Kim</b></p>
								<p><b>Sojung Lee</b></p>
							</div>
						</div>
					}
				</div>
			)
		}
}

export default WritingPM;
