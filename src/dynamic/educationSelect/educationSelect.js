import React from 'react';
import TeacherSelect from './teacherSelect'
import SchoolSelect from './schoolSelect'

class EductionSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      school: null,
      teacher: null
    }

    this.updateSchool = this.updateSchool.bind(this);
    this.updateTeacher = this.updateTeacher.bind(this);
  }

  updateSchool(school) {
    this.setState({school: school});
  }

  updateTeacher(teacher) {
    this.setState({teacher: teacher});
  }

  render() {
    const school = this.state.school;

    return (
      <div style={{paddingBottom: '1rem'}}>
        { school &&
          <div className="scs-module-element">
            <span className="bold">School:</span>&nbsp;
            {school.school_name}, {school.school_city}, {school.school_state}
            <div className="scs-inline-button" onClick={() => this.updateSchool(null)}>Edit</div>
          </div>
        }
        { !school &&
          <SchoolSelect onUpdate={this.updateSchool} />
        }
      </div>
    )
  }
}

export default EductionSelect;
