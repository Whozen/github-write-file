# Write content to file javascript action

This action writes the input content into the file mentioned in the path.

## Inputs

## `path`

**Required** The path of the file to write on to. Default `""`.

## `content`

**Required** The content to write on to the file. Default `""`.

## Outputs

## `content`

The content written into the file

## Example usage

```yaml
- name: Update GitHub Profile README
    uses: whozen/github-write-file@v1.0
    env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    with:
        path: "myFile.txt"
        content: "Hello World!!!"
```