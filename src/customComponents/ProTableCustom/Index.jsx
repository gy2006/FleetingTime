import { PureComponent, createRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Tag,
  Space,
  Divider,
  message,
  Input,
  Drawer
} from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { testData } from '@/services/user'
import request from 'umi-request';
class ProTableCustom extends PureComponent {
  actionRef = createRef();
  constructor(props) {
    super(props);
    this.state = {
      createModalVisible: false,
      updateModalVisible: false,
      stepFormValues: null,
      selectedRows: [],
      selectedRowKeys: [],
      row: null
    }
  }



  handleUpdateModalVisible = (visible) => {
    this.setState({ updateModalVisible: visible })
  }

  setRow = (entity) => {
    // this.setState({row:true})
  }


  //选择
  handleSelectRows = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys)
    this.setState({
      selectedRows: selectedRows,
      selectedRowKeys
    })
  }

  //清空选择
  cleanSelectedRows = () => {
    this.setState({ selectedRows: [] })
  };

  //刷新数据
  reloadData = () => {
    if (this.actionRef.current) {
      this.actionRef.current.reload();
    }
  }

  //重写表格列表配置
  getColumn = () => [];


  /**
   * 新增弹框
   */
  onAdd = (visible) => {
    this.setState({ createModalVisible: visible })
  };

  /* 表单提交 */
  handleAdd = (value) => {

  }












  render() {
    const {
      createModalVisible,
      updateModalVisible,
      stepFormValues,
      row,
      selectedRowKeys,
      selectedRows,

    } = this.state

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleSelectRows,
    };
    return (
      <>
        <PageContainer>
          <ProTable
            columns={this.getColumn()}
            pagination={{
              showQuickJumper: true,
            }}
            search={{
              labelWidth: 120,
            }}
            actionRef={this.actionRef}
            request={(params) => testData({ ...params })}
            rowKey="key"
            dateFormatter="string"
            headerTitle="高级表格"
            rowSelection={rowSelection}
            toolBarRender={() => [
              <Button type="primary" onClick={() => this.onAdd(true)}>
                <PlusOutlined /> 新建
              </Button>,
            ]}
          />
          {selectedRows?.length > 0 && (
            <FooterToolbar
              extra={
                <div>
                  已选择{' '}
                  <a
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {selectedRowKeys.length}
                  </a>{' '} 项&nbsp;&nbsp;
                   <span>
                    服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
                  </span>
                </div>
              }
            >
              <Button
                onClick={() => {
                  this.handleRemove(selectedRows);
                  this.cleanSelectedRows();
                  this.actionRef.current?.reloadAndRest?.();
                }}
              >
                批量删除
            </Button>
              <Button type="primary">批量审批</Button>
            </FooterToolbar>
          )
          }
          <CreateForm
            onCancel={() => this.onAdd(false)}
            modalVisible={createModalVisible}
            modalTitle={"新建表单"}
          >
            <ProTable
              onSubmit={(value) => {
                this.handleAdd(value);
              }}
              rowKey="key"
              type="form"
              columns={this.getColumn()}
            />
          </CreateForm>
        </PageContainer>
      </>
    );
  }
}

export default ProTableCustom;
