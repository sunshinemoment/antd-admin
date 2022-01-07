import { Card, Form, Input, Button } from "antd";

interface QueryFormProps {
  onSubmit?: (values: any) => void;
  onReset?: (values: any) => void;
}

const QueryForm = (props: QueryFormProps) => {
  const [form] = Form.useForm();

  function onSubmit(values) {
    props.onSubmit?.(values);
  }

  function onReset() {
    form.resetFields();
    props.onReset?.(form.getFieldsValue());
  }

  return (
    <Card bordered={false}>
      <Form layout="inline" form={form} onFinish={onSubmit}>
        <Form.Item label="Field A" name="fieldA">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Field B" name="fieldB">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default QueryForm;
