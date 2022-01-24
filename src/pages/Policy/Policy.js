import React from 'react';
import { Link } from "react-router-dom";
import Button from "components/CustomButtons/Button.js";
import './style.css'

function Policy() {
  return (
      <div className='mx-3 mx-md-5 policy_page_wrap'>
        <div className="title">관리자 관리</div>

        <div className='policy_wrap'>
            <label style={{ color: "#000" }}>서비스 약관</label>
            <div className='policy_inner'>
                <div className='policy_content_wrap'>
                    <h3>어떤 정보를 수집합니까?</h3>
                    <p>당사는 귀하가 당사 사이트에 등록할 때 정보를 수집하고 여기에서 공유된 콘텐츠를 읽고, 쓰고, 평가하여 포럼에 참여할 때 데이터를 수집합니다.</p>
                    <p>당사 사이트에 등록할 때 이름과 이메일 주소를 입력하라는 메시지가 표시될 수 있습니다. 그러나 귀하는 등록하지 않고 당사 사이트를 방문할 수 있습니다. 귀하의 이메일 주소는 고유한 링크가 포함된 이메일로 확인됩니다. 해당 링크를 방문하면 귀하가 전자 메일 주소를 제어한다는 것을 알고 있습니다. 등록 및 게시 시 해당 게시물의 출처 IP 주소를 기록합니다. 우리는 또한 우리 서버에 대한 모든 요청의 IP 주소를 포함하는 서버 로그를 유지할 수 있습니다.</p>
                </div>
                <div className='policy_content_wrap'>
                    <h3>우리는 귀하의 정보를 무엇을 위해 사용합니까?</h3>
                    <p>당사가 귀하로부터 수집한 모든 정보는 다음 방법 중 하나로 사용될 수 있습니다. 귀하의 경험을 개인화하기 위해 — 귀하의 정보는 귀하의 개별 요구에 더 잘 대응하는 데 도움이 됩니다. 사이트를 개선하기 위해 — 우리는 귀하로부터 받은 정보와 피드백을 기반으로 사이트 제공을 개선하기 위해 지속적으로 노력하고 있습니다. 고객 서비스 개선 — 귀하의 정보는 귀하의 고객 서비스 요청 및 지원 요구 사항에 보다 효과적으로 응답하는 데 도움이 됩니다. 정기적인 이메일 보내기 — 귀하가 제공한 이메일 주소는 정보, 주제 변경에 대해 요청하는 알림 또는 사용자 이름에 대한 응답, 문의 및/또는 기타 요청 또는 질문에 대한 응답을 보내는 데 사용될 수 있습니다.</p>
                </div>
                <div className='policy_content_wrap'>
                    <h3>귀하의 정보를 어떻게 보호합니까?</h3>
                    <p>당사는 귀하가 개인 정보를 입력, 제출 또는 액세스할 때 개인 정보의 안전성을 유지하기 위해 다양한 보안 조치를 시행합니다.</p>
                </div>
            </div>

            <div className='mt-5'>
              <Link to="/admin-list">
                <Button
                  style={{
                    border: "1px solid #5376FF",
                    color: "#fff",
                    width: "100px",
                    height: "auto",
                    outline: "none",
                    backgroundColor: "#5376FF"
                  }}
                  variant="contained"
                  color="primary"
                >
                  목록
                </Button>
              </Link>
            </div>
        </div>
      </div>
  )
  
}

export default Policy;
