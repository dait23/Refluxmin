import { Link, State, Navigation } from 'react-router';

import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';
//import RowGroup from 'RowGroup';

var serviceUrl = 'http://';
var UrlTable = 'chat';
var Pages = '20';
var Token = 'dsabalsdbaiyzVYVKJD78t';
var intervalHandle = null;


var Body = React.createClass({
  mixins: [State, Navigation],
  getInitialState: function(){
    return {
       data: {
          conversations: []
       }
    };
  },
  loadFromServer: function() {
    $.ajax({
      url: serviceUrl + UrlTable +'/List?admin_token=' + Token + '&per_page=' + Pages,
      //url: 'http://localhost/api/chat.json',
      dataType: 'json',
      cache: false,
      success: function(data) {
        //console.log(data);
      if (this.isMounted()) {
        this.setState({data: data});
        clearInterval(intervalHandle);
      }
      }.bind(this),
      error: function(xhr, status, err) {
      //console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    intervalHandle = setInterval(this.loadFromServer, 1);
    $('#example')
      .addClass('nowrap')
      .dataTable({
        responsive: true,
        columnDefs: [
          { targets: [-1, -3], className: 'dt-body-right' }
        ]
    });
  },
  render: function() {
    //var row = this.state.data
    //console.log(row);
    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col xs={12}>
              <PanelContainer>
                   <Panel>
                       <PanelHeader className='bg-darkgreen45 fg-white' style={{marginBottom: 20}}>
                         <Grid>
                           <Row>
                             <Col xs={6}>
                               <h3>Chats Activity</h3>
                             </Col>
                             <Col xs={6}>
                               <p className='text-right' style={{paddingTop: '10px'}}><Icon className='fg-white' style={{fontSize:'28px', fontWeight:'bold', cursor: 'pointer'}} glyph='icon-nargela-plus' onClick={this.newMember}></Icon>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon className='fg-white' style={{fontSize:'28px', fontWeight:'bold'}} glyph='icon-nargela-download'></Icon></p>
                             </Col>
                           </Row>
                         </Grid>
                       </PanelHeader>
                        <PanelBody style={{paddingBottom: 30}}>
                          <Grid>
                            <Row>
                                <Col xs={12}>


                                <ChatList id='example' data={this.state.data}/>


                                </Col>
                            </Row>
                          </Grid>
                        </PanelBody>
                   </Panel>
              </PanelContainer>
            </Col>

          </Row>
        </Grid>

      </Container>
    );
  }
});
var ChatList = React.createClass({

  render: function() {

    //var fb_url = 'http://graph.facebook.com/v2.5/';
    console.log(this.props.data.conversations);
    return (
      <Table id='example' className='display' cellSpacing='0' width='100%'>
        <thead>
          <tr>
            <th>Hostname</th>
            <th>Guestname</th>
            <th>Chats Count</th>
            <th>Last Conversations</th>
          </tr>
        </thead>

      <tbody>
         {
             this.props.data.conversations.map(function(chat) {
               var picture = '/picture';
               var fidh = chat.host_id ;
               var fidg = chat.guest_id ;
               var fb_url_host = 'http://graph.facebook.com/v2.5/' + fidh + picture;
               var fb_url_guest = 'http://graph.facebook.com/v2.5/' + fidg + picture;

               return <tr key={chat._id}>
                 <td><img src={fb_url_host} width='40' height='40' style={{borderRadius: '100%'}}/> &nbsp;{chat.host}</td>
                 <td><img src={fb_url_guest} width='40' height='40' style={{borderRadius: '100%'}}/> &nbsp;{chat.guest}</td>
                 <td>{chat.count} conversations</td>
                 <td>{chat.last_updated}</td>
               </tr>
             })
         }
     </tbody >
</Table>
    )
  }
});
@SidebarMixin
export default class extends React.Component {
  render() {
    var classes = classNames({
      'container-open': this.props.open
    });

    return (
      <Container id='container' className={classes}>
        <Sidebar />
        <Header />
        <Body />
        <Footer />
      </Container>
    );
  }
}
